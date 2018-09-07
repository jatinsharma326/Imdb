$(document).ready(() => {
    $('.button1').click(function() {
        //changing placeholder when clicked on name
        $('.normal-input').attr('placeholder', 'Search by Name...')
        // removing the year searchbar 
        $('.year-input').css('display', 'none')
        // removing the active from other selected tabs and active the current one
        $('.button2').removeClass('selected')
        $('.button3').removeClass('selected')
        $(this).addClass('selected')
        $('input').val('')
    })
    $('.button2').click(function() {
        $('.normal-input').attr('placeholder', 'Search by Name...')
        // displaying year search bar
        $('.year-input').css({
            'display': 'block',
            'margin-left': '2px'
        })
        $('.button1').removeClass('selected')
        $('.button3').removeClass('selected')
        $(this).addClass('selected')
        $('input').val('')
    })
    $('.button3').click(function() {
        $('.normal-input').attr('placeholder', 'Search by IMDB ID...')
        $('.year-input').css('display', 'none')
        $('.button1').removeClass('selected')
        $('.button2').removeClass('selected')
        $(this).addClass('selected')
        $('input').val('')
    })
})
// hitting enter button
$('input').keypress((e) => {
    if (e.which == 13) { //Enter key pressed
        $('.input-group-btn').trigger('click'); //Trigger search button click event
    }
});
// clicking search button on enter hit
$('.input-group-btn').click(() => {
    getData();
})

let getData = () => {
        let input = document.getElementsByTagName("input");
        let link;
        // if button1 is selected
        if ($('.button1').hasClass('selected')) {
            link = `https://www.omdbapi.com/?t=${input[0].value}&apikey=5efead1`
            // if button2 is selected
        } else if ($('.button2').hasClass('selected')) {
            link = `https://www.omdbapi.com/?t=${input[0].value}&y=${input[1].value}&apikey=5efead1`
            // if button3 is selected
        } else if ($('.button3').hasClass('selected')) {
            link = `https://www.omdbapi.com/?i=${input[0].value}&apikey=5efead1`
        } else {
            alert('some error occured')
        }
        $.ajax({
                type: "GET",
                dataType: 'json',
                url: link,
                success: (data) => {
                    if (data.Response == "False") {
                        // error message displays if response is false
                        $('#error').css('display', 'block')
                        $('#movie-container').css('display', 'none')
                        $('#error-text').html(data.Error)
                    } else {
                        // movie container displays if response is true
                        $('#error').css('display', 'none')
                        $('#movie-container').css('display', 'block')
                        // validating title
                        if (data.Title !== null && data.Title !== undefined && data.Year !== null && data.Year !== undefined) {

                            $('#title').html(`${data.Title}&nbsp;<span class="year text-muted">(${data.Year})</span>`)

                        } else {
                            console.log(`No Title or Year Found`);
                        }
                        // validating type
                        if (data.Type !== null && data.Type !== undefined) {

                            let category = data.Type.substr(0, 1).toUpperCase() + data.Type.substr(1);
                            $('#category').html(`Category:&nbsp;<span class="text-warning">${category}</span>`)

                        } else {
                        	$('#category').html('N/A')
                            console.log(`No Type Found`);
                        }
                        // validating rating
                        if (data.Rated !== null && data.Rated !== undefined) {

                            $('#rated').html(data.Rated)

                        } else {
                        	$('#rated').html('N/A')
                            console.log(`No Rated Found`);
                        }
                        // validating release date
                        if (data.Released !== null && data.Released !== undefined) {

                            $('#released').html(data.Released)

                        } else {
                        	$('#released').html('N/A')
                            console.log(`No Released Found`);
                        }
                        // validating runtime
                        if (data.Runtime !== null && data.Runtime !== undefined) {

                            $('#runtime').html(data.Runtime)

                        } else {
                        	$('#runtime').html('N/A')
                            console.log(`No Runtime Found`);
                        }
                        // validating ratings
                        if (data.Ratings !== null && data.Ratings !== undefined && data.Ratings.length != 0) {

                            for (let rating of data.Ratings) {
                                if (rating.Source == "Rotten Tomatoes") {
                                    $('#rotten').html(rating.Value)
                                    break;
                                } else {
                                    // if rotten tomatoes not found then its na
                                    $('#rotten').html('N/A')
                                }
                            }
                        } else {
                            // if rating has nothing in it then rotten tomatoes is na
                            $('#rotten').html('N/A')
                            console.log(`No Ratings Found`);
                        }
                        // validating metascore
                        if (data.Metascore !== null && data.Metascore !== undefined) {

                            $('#metascore').html(data.Metascore)

                        } else {
                        	$('#metascore').html('N/A')
                            console.log(`No Metascore Found`);
                        }
                        // validating genre
                        if (data.Genre !== null && data.Genre !== undefined) {

                            $('#genre').html(data.Genre)

                        } else {
                        	$('#genre').html('N/A')
                            console.log(`No Genre Found`);
                        }
                        // validating imdbrating
                        if (data.imdbRating !== null && data.imdbRating !== undefined) {

                            $('#imdbrating').html(`${data.imdbRating}<span class="root-font text-muted">/10</span><div class="root-font">${data.imdbVotes}</div>`)

                        } else {
                        	$('#imdbrating').html('N/A')
                            console.log(`No imdbRating Found`);
                        }
                        // validating poster
                        if (data.Poster !== null && data.Poster !== undefined && data.Poster != "N/A") {

                            $('#poster').attr('src', data.Poster)

                        } else {
                            // if poster is na then url will be no picture found
                            $('#poster').attr('src', 'https://www.movietrailerbox.com/assets/images/imdbnoimage.jpg')
                            console.log(`No Poster Found`);
                        }
                        // validating plot
                        if (data.Plot !== null && data.Plot !== undefined) {

                            $('#plot').html(data.Plot)

                        } else {
                        	$('#plot').html('N/A')
                            console.log(`No Plot Found`);
                        }
                        // validating awards
                        if (data.Awards !== null && data.Awards !== undefined) {

                            $('#awards').html(data.Awards)

                        } else {
                        	$('#awards').html('N/A')
                            console.log(`No Awards Found`);
                        }
                        // validing imdbid
                        if (data.imdbID !== null && data.imdbID !== undefined) {

                            $('#imdbID').html(data.imdbID)

                        } else {
                            console.log(`No imdbID Found`);
                        }
                        // validating director, writer, actor, language, country
                        if (data.Director !== null && data.Director !== undefined) {

                            $('#director').html(data.Director)

                        } else {
                        	$('#director').html('N/A')
                            console.log(`No Director Found`);
                        }
                        if (data.Writer !== null && data.Writer !== undefined) {

                            $('#writer').html(data.Writer)

                        } else {
                        	$('#writer').html('N/A')
                            console.log(`No Writer Found`);
                        }
                        if (data.Actors !== null && data.Actors !== undefined) {

                            $('#actors').html(data.Actors)

                        } else {
                        	$('#actors').html('N/A')
                            console.log(`No Actors Found`);
                        }
                        if (data.Language !== null && data.Language !== undefined) {

                            $('#language').html(data.Language)

                        } else {
                        	$('#language').html('N/A')
                            console.log(`No Language Found`);
                        }
                        if (data.Country !== null && data.Country !== undefined) {

                            $('#country').html(data.Country)

                        } else {
                        	$('#country').html('N/A')
                            console.log(`No Country Found`);
                        }
                        // validating dvd, boxoffice, production, website
                        if (data.DVD !== null && data.DVD !== undefined) {

                            $('#dvd').html(data.DVD)

                        } else {
                        	$('#dvd').html('N/A')
                            console.log(`No DVD Found`);
                        }
                        if (data.BoxOffice !== null && data.BoxOffice !== undefined) {

                            $('#boxoffice').html(data.BoxOffice)

                        } else {
                        	$('#boxoffice').html('N/A')
                            console.log(`No BoxOffice Found`);
                        }
                        if (data.Production !== null && data.Production !== undefined) {

                            $('#production').html(data.Production)

                        } else {
                        	$('#production').html('N/A')
                            console.log(`No Production Found`);
                        }
                        if (data.Website !== null && data.Website !== undefined && data.Website != "N/A") {

                            $('#website').html(`<a href="${data.Website}" target="_blank">${data.Website}</a>`)

                        } else {
                            $('#website').html('N/A')
                            console.log(`No Website Found`);
                        }
                    }
                },
                // timeout of 5s
                timeout: 5000,
                // displaying error message
                error: (request, errorType, errorMessage) => {
                    if (errorType === "timeout") {
                        alert('Connection timeout')

                    } else {
                        console.log("success");
                    }
                },
                    // loader
                    beforeSend: () => {
                            $("#movie-container").css('display', 'none');
                            $("#error").css('display', 'none');
                            $(".loader").css('display', 'block');
                            console.log("Sending Req");
                        },
                        // hiding loader
                        complete: () => {
                            $(".loader").css('display', 'none');
                        }
                })
        }