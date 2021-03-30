// const requestURL = 'https://github.com/watercable76/chamber_of_commerce_w2021/blob/main/js/businesses.json';
const requestURL = 'https://github.com/watercable76/chamber_of_commerce_w2021/blob/b441851e88b42ee5f057fe7c76ec713df4a3758a/js/businesses.json';

const page_selection = document.getElementsByTagName('title')[0].textContent;

// , {mode: 'same-origin'}
fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.log(JSON.stringify(jsonObject));

        const businesses = jsonObject['businesses'];

        if (page_selection === 'Rexburg Business') {
            for (let i = 0; i < businesses.length; i++) {
                console.log(businesses[i]);
                // console.log("First if"); -- debugging purposes
                if (businesses[i].name === 'Blister\'s BBQ' || businesses[i].name === 'Soda Springs' || businesses[i].name === 'Fish Haven') {
                    let card = document.createElement('section');
                    card.setAttribute('class', 'cards_section');
                    // create h2 for town name, motto (italicized), year founded, population and rainfall
                    let h2 = document.createElement('h2');
                    let span = document.createElement('span');
                    let p1 = document.createElement('p');

                    // create img and store inside a figure element
                    let img = document.createElement('img');
                    let figure = document.createElement('figure');
                    figure.setAttribute('class', 'json_fig_imgs');

                    image = "images/" + businesses[i].photo;
                    img.setAttribute('src', image);
                    img.setAttribute('alt', "image of " + name);
                    img.setAttribute('class', 'fig_imgs');
                    figure.appendChild(img);

                    h2.textContent = businesses[i].name;
                    span.textContent = businesses[i].abbreviation;
                    p1.textContent = "Year Founded: " + businesses[i].yearFounded;

                    span.setAttribute('class', 'motto');

                    // set a div to hold all but the figure
                    let div2 = document.createElement('div');
                    div2.setAttribute('class', 'card_div_text');

                    div2.appendChild(h2);
                    div2.appendChild(span);
                    div2.appendChild(p1);

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

            for (let i = 0; i < businesses.length; i++) {
                if (businesses[i].name === x) {
                    list = businesses[i].events;
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
