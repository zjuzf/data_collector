d3.queue()
    .defer(d3.json, "./SRC/data/data.json")
    .await(main);

var p1, p2, p3, p4, data;

function main(error, jsondata)
{
    if (error) throw error;
    console.log(jsondata);
    data = {
        matchinfo:{
            date:{
                year:"",
                month:"",
                day:""
            },
            time:{
                min:"",
                sec:""
            },
            team0:"",
            team1:"",
            score0:"",
            score1:"",
            video:{
                path:"",
                name:""
            }
        },
        players:{
            team0: new Array(),
            team1: new Array()
        },
        sequences: new Array()
    };
    p1 = new matchinfo(jsondata);
    p2 = new playersinfo(jsondata);
    p3 = new detailsinfo();
    p4 = new preview();
}