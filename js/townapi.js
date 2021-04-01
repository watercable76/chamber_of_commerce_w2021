const requestURL = 'https://watercable76.github.io/town_json_data/businesses.json';
// const requestURL = 'https://watercable76.github.io/chamber_of_commerce/js/businesses.json';

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
                if (businesses[i].name === 'Blister\'s BBQ' || businesses[i].name === 'Taco Bus' || businesses[i].name === 'Dairy Queen') {
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
        } else if (page_selection === 'Directory') {
            for (let i = 0; i < businesses.length; i++) {
                let card = document.createElement('section');
                card.setAttribute('class', 'gallery_images');

                let h2 = document.createElement('h2');
                let span = document.createElement('span');
                let p1 = document.createElement('p');
                let a = document.createElement('a');

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

                a.textContent = businesses[i].name;
                a.setAttribute('href', businesses[i].url);

                span.setAttribute('class', 'motto');

                // set a div to hold all but the figure
                let div2 = document.createElement('div');
                div2.setAttribute('class', 'card_div_text');

                div2.appendChild(h2);
                div2.appendChild(span);
                div2.appendChild(p1);
                div2.appendChild(a);

                // card.appendChild(img);
                card.appendChild(div2);
                card.appendChild(figure);

                document.querySelector('div.cards').appendChild(card);
            }
        }


    });
