# NIGERIA COVID19 API

This is a full covid19 API for nigeria with full timeline. 

Source: 
  - [NCDC](https://covid19.ncdc.gov.ng)
  - [Wikipedia](https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Nigeria)

Live at [`https://covid19ngr.herokuapp.com`](https://covid19ngr.herokuapp.com)

# REST API

The endpoints to the API is described below.

## Get latest totals

### Request

`GET /api/totals/`

    curl -i -H 'Accept: application/json' https://covid19ngr.herokuapp.com/api/totals/

### Response

    {
        "data":
        {
            "confirmedCases": 2802,
            "activeCases": 2292,
            "discharged": 417,
            "death": 93,
            "samplesTested": 18536
        }
    }
   
## Get latest totals for all states

### Request

`GET /api/states/`

    curl -i -H 'Accept: application/json' https://covid19ngr.herokuapp.com/api/states/

### Response

    {
        "data":
          [
              {
                  "state": "lagos",
                  "confirmedCases": 1183,
                  "activeCases": 892,
                  "discharged": 261,
                  "death": 30
               },
               {
                    "state": "kano",
                    "confirmedCases": 365,
                    "activeCases": 357,
                    "discharged": 0,
                    "death": 8
                },
                ...
            ]
     }
     
 ## Get latest totals for a state

### Request

`GET /api/states/:statename`

    curl -i -H 'Accept: application/json' https://covid19ngr.herokuapp.com/api/states/lagos

### Response

    {
        "data":
            {
                "state": "lagos",
                "confirmedCases": 1183,
                "activeCases": 892,
                "discharged": 261,
                "death": 30
             }
     }
    
 ## Get timeline

### Request

`GET /api/timelines/`

    curl -i -H 'Accept: application/json' https://covid19ngr.herokuapp.com/api/timelines/

### Response

    {
        "data":
          [
              {
                  "dailyConfirmed": 1,
                  "dailyDeceased": 0,
                  "dailyRecovered": 0,
                  "date": "2020-02-27",
                  "totalConfirmed": 1,
                  "totalDeath": 0,
                  "totalDischarged": 0
              },
              {
                  "dailyConfirmed": 0,
                  "dailyDeceased": 0,
                  "dailyRecovered": 0,
                  "date": "2020-02-28",
                  "totalConfirmed": 1,
                  "totalDeath": 0,
                  "totalDischarged": 0
              },
              ...
          ]
      }
   
## Get timeline with date range

### Query
  - from = `Date` format: YYYY-MM-DD
  - to = `Date` format: YYYY-MM-DD

### Request

`GET /api/timelines?from=2020-02-29&to=2020-03-02`

    curl -i -H 'Accept: application/json' \
    https://covid19ngr.herokuapp.com/api/timelines?from=2020-02-29&to=2020-03-02

### Response

    {
        "data":
          [
              {
                  "dailyConfirmed":0,
                  "dailyDeceased":0,
                  "dailyRecovered":0,
                  "date":"2020-02-29T00:00:00.000Z",
                  "totalConfirmed":1,
                  "totalDeath":0,
                  "totalDischarged":0
              },
              {
                  "dailyConfirmed":0,
                  "dailyDeceased":0,
                  "dailyRecovered":0,
                  "date":"2020-03-01T00:00:00.000Z",
                  "totalConfirmed":1,
                  "totalDeath":0,
                  "totalDischarged":0
              },
              {
                  "dailyConfirmed":0,
                  "dailyDeceased":0,
                  "dailyRecovered":0,
                  "date":"2020-03-02T00:00:00.000Z",
                  "totalConfirmed":1,
                  "totalDeath":0,
                  "totalDischarged":0
              }
           ]
     }

# Contribution

Wanna contribute? Amazing...

This API uses [Node.js](https://nodejs.org) and the [Express.Js](https://expressjs.com/) web application framework.

Read this guide [The beginner's guide to contributing to a GitHub project](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/)

Install the app, write your feature and make your pull request.

# Todo
  - Timeline for all states
  - Tests
  - Send mail to admin if cron job fails



