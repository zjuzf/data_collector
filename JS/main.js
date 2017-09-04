d3.queue()
    .defer(d3.json, "./SRC/data/data.json")
    .defer(d3.json, "./SRC/data/const.json")
    .await(main);

function main(error, jsondata, constdata)
{
    if (error) throw error;
    console.log(jsondata, constdata);
    var data = {
        matchinfo:{
            date:{
                year:0,
                month:0,
                day:0
            },
            time:{
                min:0,
                sec:0
            },
            team0:-1,
            team1:-1,
            score0:0,
            score1:0,
            video:{
                path:"",
                name:""
            }
        },
        players: new Array(),
        sequences: new Array()
    };
    var p1 = new matchinfo(jsondata, data.matchinfo);
    var p2 = new playersinfo();
    var p3 = new detailsinfo();
    var p4 = new preview();
}