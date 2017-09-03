#include <iostream>
#include <fstream>
#include <string>

using namespace std;

typedef struct
{
	int id;
	string name;
} team;
typedef struct
{
	int id, jersey;
	string name, position;
	team belong;
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

int main ()
{
	team teams[500];
	player players[5000];
	event events[100];
	qualifier qualifiers[1000];
	int num_teams, num_players, num_events, num_qualifiers;	
	bool flag;
	ifstream in_teams("teams.txt"), in_players("players.txt"), in_events("events.txt"), in_qualifiers("qualifiers.txt");
	ofstream out("data.json");
	
	num_teams = num_players = num_events = num_qualifiers = 0;
	
	if (!(in_teams.is_open() && in_players.is_open() && in_events.is_open() && in_qualifiers.is_open()))
	{
		cout << "Error opening file";
		return 1;
	}
	while (!in_teams.eof())
	{
		in_teams >> teams[num_teams].name;
		if(teams[num_teams].name == "") break;
		
		flag = false;
		for(int i = 0; i < num_teams; i++)
			if(teams[num_teams].name == teams[i].name)
			{
				flag = true;
				break;
			}
		if(flag) continue;
		num_teams++;
	}
	while (!in_players.eof())
	{
		in_players >> players[num_players].name >> players[num_players].belong.name >> players[num_players].jersey >> players[num_players].position;
		if(players[num_players].belong.name == "") break;
		for(int i = 0; i < num_teams; i++)
		num_players++;
	}
//	while (!in_teams.eof())
//	{
//		in_teams >> teams[num_teams].name >> teams[num_teams].id;
//		if(teams[num_teams].name == "") break;
//		num_teams++;
//	}
//	while (!in_teams.eof())
//	{
//		in_teams >> teams[num_teams].name >> teams[num_teams].id;
//		if(teams[num_teams].name == "") break;
//		num_teams++;
//	}
	
	if (out.is_open())
	{
		out << "{" << endl;
		out << "    \"teams\":{" << endl;
		out << "    }," << endl;
		out << "    \"players\":{" << endl;
		out << "    }," << endl;
		out << "    \"events\":{" << endl;
		out << "    }," << endl;
		out << "    \"qualifiers\":{" << endl;
		out << "    }" << endl;
		out << "}";
		out.close();
	}
}
