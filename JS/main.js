d3.queue()
    .defer(d3.json, "./SRC/data/data.json")
    .await(main);

function main(error, jsondata)
{
    if (error) throw error;
    console.log(jsondata);
}