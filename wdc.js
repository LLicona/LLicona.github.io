(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        tableau.log("Hello WDC!");
        var cols = [{
        id: "id",
        dataType: tableau.dataTypeEnum.string
        }, {
            id: "mag",
            alias: "magnitude",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "title",
            alias: "title",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "location",
            dataType: tableau.dataTypeEnum.geometry
        }];

        var tableSchema = {
            id: "earthquakeFeed",
            alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
        var url = 'https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json';
      	$.ajax
          ({
            type: "GET",
            url: url,
            dataType: 'json',
            async: false,
            username: "username",
            password: "password",
            success: function (response){
                var feat = resp.features,
                tableData = [];
                console.log('feat: ',feat);
                // Iterate over the JSON object
                for (var i = 0, len = feat.length; i < len; i++) {
                    tableData.push({
                        "title": feat[i].title,
                        "year": feat[i].year,
                    });
                }
            }
            
            table.appendRows(tableData);
            doneCallback();
            
          });
    };

    tableau.registerConnector(myConnector);
    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "USGS Earthquake Feed";
        tableau.submit();
    });
});
})();
