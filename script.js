async function get_data() {
    var res = await fetch("https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json")
    var result = await res.json();
    console.log(result);

    for (var i = 0; i < result.length; i++) {
        var name = result[i].name;
        var latlng = result[i].latlng;
        var capital_data = result[i].capital;
        open_data(name, ...latlng, capital_data);
    }
}

async function open_data(name, lat, lon, capital_data) {
    try {
        if (lat == undefined) {
            throw new Error("Invalid Lat Long values");
        }
        var open_res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=339d8ddb6209f49935d0fc12fbfa0f77`)
        var final_res = await open_res.json();
        console.log(`Name:${name}, Capital:${capital_data}, lat:${lat}, longitude:${lon}`);

        var container = document.createElement("div");
        container.className = "container";

        var col = document.createElement('div');
        col.className = "col-md-4";

        col.innerHTML = `<div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <p><b>Name:</b> ${name}</p>
                                <p><b>Capital:</b> ${capital_data}</p>
                                <p><b>Latitude:</b> ${lat}</p>
                                <p><b>Longitude:</b> ${lon}</p>
                            </div>
                        </div>`;

        container.appendChild(col);
        document.body.appendChild(container);

    } catch (error) {
        console.log("data lost" + error.message);
    }
}

get_data();
