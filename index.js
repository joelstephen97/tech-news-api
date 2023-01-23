const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const newspapers = [
    {
        name:"Guardian Tech",
        address: "https://www.theguardian.com/uk/technology",
        base: ""
    },
    {
        name:"Telegraph Tech",
        address: "https://www.telegraph.co.uk/technology/",
        base: "https://www.telegraph.co.uk"
    },
    {
        name:"New Yorks Time Tech",
        address: "https://www.nytimes.com/section/technology",
        base: "https://www.nytimes.com/"
    },
    {
        name:"Technews World",
        address: "https://www.technewsworld.com/",
        base: "https://www.technewsworld.com/"
    },
    {
        name:"Tech Times",
        address: "https://www.techtimes.com/",
        base: "https://www.techtimes.com/"
    },
    {
        name:"Verge Tech",
        address: "https://www.theverge.com/tech",
        base: "https://www.theverge.com/"
    }
]

const articles = []

newspapers.forEach(newspaper =>{
    axios.get(newspaper.address)
    .then(response=>{
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("Elon")', html).each(function (){ //need to change this
            const title = $(this).text()
            const url = $(this).attr('href')

            articles.push({
                title,
                url: newspaper.base+url,
                source: newspaper.name
            })
        })
    }).catch((err) => console.log(err))
})


app.get('/',(req,res)=>{
    res.json('Welcome')
})

app.get('/news',(req,res)=>{
    res.json(articles)
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

