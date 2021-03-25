const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';


const page_selection = document.getElementsByTagName('title')[0].textContent;


fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        // console.table(jsonObject); // temporary checking for valid response and data parsing
        // console.log("Inside api call");

        const towns = jsonObject['towns'];

        if (page_selection === 'Idaho News') {
            for (let i = 0; i < towns.length; i++) {
                // console.log("First if"); -- debugging purposes
                if (towns[i].name === 'Preston' || towns[i].name === 'Soda Springs' || towns[i].name === 'Fish Haven') {
                    let card = document.createElement('section');
                    card.setAttribute('class', 'cards_section');
                    // create h2 for town name, motto (italicized), year founded, population and rainfall
                    let h2 = document.createElement('h2');
                    let span = document.createElement('span');
                    let p1 = document.createElement('p');
                    let p2 = document.createElement('p');
                    let p3 = document.createElement('p');

                    let name = towns[i].name;

                    // create img and store inside a figure element
                    let img = document.createElement('img');
                    let figure = document.createElement('figure');
                    figure.setAttribute('class', 'json_fig_imgs');

                    image = "images/" + towns[i].photo;
                    img.setAttribute('src', image);
                    img.setAttribute('alt', "image of " + name);
                    img.setAttribute('class', 'fig_imgs');
                    figure.appendChild(img);

                    h2.textContent = name;
                    span.textContent = towns[i].motto;
                    p1.textContent = "Year Founded: " + towns[i].yearFounded;
                    p2.textContent = "Population: " + towns[i].currentPopulation;
                    p3.textContent = "Annual Rain Fall: " + towns[i].averageRainfall;

                    span.setAttribute('class', 'motto');

                    // set a div to hold all but the figure
                    let div2 = document.createElement('div');
                    div2.setAttribute('class', 'card_div_text');

                    div2.appendChild(h2);
                    div2.appendChild(span);
                    div2.appendChild(p1);
                    div2.appendChild(p2);
                    div2.appendChild(p3);

                    // card.appendChild(img);
                    card.appendChild(div2);
                    card.appendChild(figure);

                    document.querySelector('div.cards').appendChild(card);
                }
            }
        } else if (page_selection === 'Preston' || page_selection === 'Soda Springs' || page_selection === 'Fish Haven') {
            // console.log('Else if');
            // create the div to hold the data
            let div = document.createElement('div');
            div.setAttribute('class', 'events_div');


            // create header element
            let h2 = document.createElement('h2');
            h2.textContent = 'Upcoming Events';
            h2.setAttribute('class', 'events_header');


            const x = document.getElementsByTagName('title')[0].textContent;
            let list = [];

            for (let i = 0; i < towns.length; i++) {
                if (towns[i].name === x) {
                    list = towns[i].events;
                }
            }

            // append header before adding the events themselves
            div.appendChild(h2);

            for (let i = 0; i < list.length; i++) {
                let p = document.createElement('p');
                p.textContent = list[i];
                div.appendChild(p);
            }

            document.querySelector('div.town_events').appendChild(div);
        }


    });
