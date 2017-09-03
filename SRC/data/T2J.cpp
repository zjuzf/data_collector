#include <iostream>
#include <fstream>
#include <string>
#include <stdio.h>
#include <string.h>
#include <Windows.h>
#include <sstream>

using namespace std;

typedef struct
{
	int id;
	string name;
} team;
typedef struct
{
	int id, jersey, belong;
	string name, position;
} player;
typedef struct
{
	int id;
	string name, code;
} event;
typedef struct
{
	int id;
	string name, code;
} qualifier;

team teams[50000];
player players[500000];
event events[100];
qualifier qualifiers[1000];

void writeUTF8(FILE *fp, const char *origin_s)
{
	char *s;
	wchar_t *wc;
	int len = strlen(origin_s);
	s = (char*)malloc(sizeof(char) * (len+1));
	wc = (wchar_t*)malloc(sizeof(wchar_t) * (len*3));
	strcpy(s, origin_s);

	int n = MultiByteToWideChar(CP_ACP, 0, s, strlen(s), wc, len*3);
	if ( n > 0 )
	{
		wc[n] = 0;

		char mb[len*12];
		n = WideCharToMultiByte(CP_UTF8, 0, wc, wcslen(wc), mb, len*12, NULL, NULL);
		if ( n > 0 )
		{
			mb[n] = 0;
			fwrite(mb, sizeof(char), strlen(mb), fp);
		}
	}
}

int main ()
{
	int num_teams, num_players, num_events, num_qualifiers;
	int i, choice;
	bool flag;
	string temp_string;
	stringstream out;
	ifstream in_teams("teams.txt"), in_players("players.txt"), in_events("events.txt"), in_qualifiers("qualifiers.txt");
	FILE* fp = fopen("data.json", "wb+");
	char header[3] = {(char)0xEF, (char)0xBB, (char)0xBF};
	fwrite(header, sizeof(char), 3, fp);

	num_teams = num_players = num_events = num_qualifiers = 0;

	if (!(in_teams.is_open() && in_players.is_open() && in_events.is_open() && in_qualifiers.is_open()))
	{
		cout << "Error opening file";
		return 1;
	}
	cout << "Reading teams..." << "\n";
	while (!in_teams.eof())
	{
		in_teams >> teams[num_teams].name;
		if(teams[num_teams].name == "") break;

		flag = false;
		for(i = 0; i < num_teams; i++)
			if(teams[num_teams].name == teams[i].name)
			{
				flag = true;
				break;
			}
		if(flag) cout << "队伍 " << teams[num_teams].name << " 重复出现，已自动忽略。" << "\n";
		else num_teams++;
	}
	cout << "Reading players..." << "\n";
	while (!in_players.eof())
	{
		in_players >> players[num_players].name >> temp_string >> players[num_players].jersey >> players[num_players].position;
		if(players[num_players].name == "") break;

		if(players[num_players].jersey < 0 || players[num_players].jersey > 99)
		{
			cout << "球员 " << players[num_players].name << " 的球衣号码 " << players[num_players].jersey << " 超出范围，已自动忽略。" << "\n";
			continue;
		}
		if(players[num_players].position != "前锋" && players[num_players].position != "中场" && players[num_players].position != "后卫" && players[num_players].position != "守门员" && players[num_players].position != "替补")
		{
			cout << "球员 " << players[num_players].name << " 的位置 " << players[num_players].position << " 无法识别，已自动忽略。" << "\n";
			continue;
		}

		flag = false;
		for(i = 0; i < num_players; i++)
			if(teams[players[i].belong].name == temp_string && players[i].jersey == players[num_players].jersey)
			{
				flag = true;
				break;
			}
		if(flag)
		{
			players[num_players].belong = players[i].belong;
			cout << "队伍 " << temp_string << " 的 " << players[num_players].jersey << " 号球衣同时授予了：" << "\n";
			cout << "0: " << players[i].name << " ( " << players[i].position << " )" << "\n";
			cout << "1: " << players[num_players].name << " ( " << players[num_players].position << " )" << "\n";
			cout << "请输入01编号，决定保留的球员信息：";
			cin >> choice;
			if(choice) players[i] = players[num_players];
			continue;
		}

		flag = false;
		for(i = 0; i < num_teams; i++)
			if(teams[i].name == temp_string)
			{
				flag = true;
				break;
			}
		if(flag)
		{
			players[num_players].belong = i;
			num_players++;
		}
		else
		{
			cout << "球员 " << players[num_players].name << " 所属的队伍 " << temp_string << " 在队伍列表中没有查询到！你可以选择：" << "\n";
			cout << "0.删除该球员 1.添加此队伍";
			cin >> choice;
			if(choice)
			{
				teams[num_teams].name = temp_string;
				players[num_players].belong = num_teams++;
				num_players++;
			}
		}
	}
	cout << "Reading events..." << "\n";
	while (!in_events.eof())
	{
		in_events >> events[num_events].code >> events[num_events].id >> events[num_events].name;
		if(events[num_events].code == "") break;

		flag = false;
		for(i = 0; i < num_events; i++)
			if(events[num_events].name == events[i].name || events[num_events].code == events[i].code || events[num_events].id == events[i].id)
			{
				flag = true;
				break;
			}
		if(flag)
		{
			cout << "事件存在冲突：" << "\n";
			cout << "0：" << events[i].code << events[i].id << events[i].name << "\n";
			cout << "1：" << events[num_events].code << events[num_events].id << events[num_events].name << "\n";
			cout << "请输入01编号选择保留的数据：" ;

			cin >> choice;
			if(choice) events[i] = events[num_events];
			continue;
		}

		num_events++;
	}
	cout << "Reading qualifiers..." << "\n";
	while (!in_qualifiers.eof())
	{
		in_qualifiers >> qualifiers[num_qualifiers].code >> qualifiers[num_qualifiers].id >> qualifiers[num_qualifiers].name;
		if(qualifiers[num_qualifiers].code == "") break;

		flag = false;
		for(i = 0; i < num_qualifiers; i++)
			if(qualifiers[num_qualifiers].name == qualifiers[i].name || qualifiers[num_qualifiers].code == qualifiers[i].code || qualifiers[num_qualifiers].id == qualifiers[i].id)
			{
				flag = true;
				break;
			}
		if(flag)
		{
			cout << "属性存在冲突：" << "\n";
			cout << "0：" << qualifiers[i].code << qualifiers[i].id << qualifiers[i].name << "\n";
			cout << "1：" << qualifiers[num_qualifiers].code << qualifiers[num_qualifiers].id << qualifiers[num_qualifiers].name << "\n";
			cout << "请输入01编号选择保留的数据：" ;

			cin >> choice;
			if(choice) qualifiers[i] = qualifiers[num_qualifiers];
			continue;
		}

		num_qualifiers++;
	}

	for(i = 0; i < num_teams; i++) teams[i].id = 10000+i;
	for(i = 0; i < num_players; i++) players[i].id = 1000000+i;

	out.clear();
	out << "{" << "\n";
	out << "\"teams\":[" << "\n";
	for (i = 0; i < num_teams; i++)
	{
		out << "{";
		out << "\"name\":" << "\"" << teams[i].name << "\"";
		out << " , ";
		out << "\"tid\":" << "\"" << teams[i].id << "\"";
		out << "}";
		if(i!=num_teams-1) out << ",";
		out << "\n";
	}
	out << "]," << "\n";

	out << "\"players\":[" << "\n";
	for (i = 0; i < num_players; i++)
	{
		out << "{";
		out << "\"name\":" << "\"" << players[i].name << "\"";
		out << " , ";
		out << "\"tid\":" << "\"" << teams[players[i].belong].id << "\"";
		out << " , ";
		out << "\"pid\":" << "\"" << players[i].id << "\"";
		out << " , ";
		out << "\"jersey\":" << "\"" << players[i].jersey << "\"";
		out << " , ";
		out << "\"position\":" << "\"" << players[i].position << "\"";
		out << "}";
		if(i!=num_players-1) out << ",";
		out << "\n";
	}
	out << "]," << "\n";

	out << "\"events\":[" << "\n";
	for (i = 0; i < num_events; i++)
	{
		out << "{";
		out << "\"name\":" << "\"" << events[i].name << "\"";
		out << " , ";
		out << "\"eid\":" << "\"" << events[i].id << "\"";
		out << " , ";
		out << "\"code\":" << "\"" << events[i].code << "\"";
		out << "}";
		if(i!=num_events-1) out << ",";
		out << "\n";
	}
	out << "]," << "\n";

	out << "\"qualifiers\":[" << "\n";
	for (i = 0; i < num_qualifiers; i++)
	{
		out << "{";
		out << "\"name\":" << "\"" << qualifiers[i].name << "\"";
		out << " , ";
		out << "\"qid\":" << "\"" << qualifiers[i].id << "\"";
		out << " , ";
		out << "\"code\":" << "\"" << qualifiers[i].code << "\"";
		out << "}";
		if(i!=num_qualifiers-1) out << ",";
		out << "\n";
	}
	out << "]" << "\n";
	out << "}";
	temp_string = out.str();

	writeUTF8(fp, temp_string.c_str());

	return 0;
}
