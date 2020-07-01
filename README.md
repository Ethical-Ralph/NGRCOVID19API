# NIGERIA COVID19 API

This is a full covid19 data API for nigeria with full timeline.

Source:

-   [NCDC](https://covid19.ncdc.gov.ng)

Live at [`https://covid19.ethicalhub.tech/`](https://covid19.ethicalhub.tech/)

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
            "confirmedCases": Number,
            "activeCases": Number,
            "discharged": Number,
            "death": Number,
            "samplesTested": Number
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
                    "state": String,
                    "confirmedCases": Number,
                    "activeCases": Number,
                    "discharged": Number,
                    "death": Number
                },
                ...
                ...
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
                "state": String,
                "confirmedCases": Number,
                "activeCases": Number,
                "discharged": Number,
                "death": Number
            }
    }

## Get national timeline

### Request

`GET /api/timelines/`

    curl -i -H 'Accept: application/json' https://covid19ngr.herokuapp.com/api/timelines/

### Response

    {
        "data":
            [
                {
                    "date": "2020-02-27T00:00:00.000Z",
                    "total": 1,
                    "totalConfirmed": 1
                },
                {
                    "date": "2020-03-09T00:00:00.000Z",
                    "total": 1,
                    "totalConfirmed": 2
                },
                {
                    "date": "2020-03-17T00:00:00.000Z",
                    "total": 1,
                    "totalConfirmed": 3
                },
                ...
                ...
                ...
            ]
    }

## Get national timeline with date range

### Query

-   from = `Date` format: YYYY-MM-DD
-   to = `Date` format: YYYY-MM-DD

### Request

`GET /api/timelines?from=2020-02-29&to=2020-03-02`

    curl -i -H 'Accept: application/json' \
    https://covid19ngr.herokuapp.com/api/timelines?from=2020-02-27&to=2020-03-17

### Response

    {
        "data":
            [
                {
                    "date": "2020-02-27T00:00:00.000Z",
                    "total": 1,
                    "totalConfirmed": 1
                },
                {
                    "date": "2020-03-09T00:00:00.000Z",
                    "total": 1,
                    "totalConfirmed": 2
                },
                {
                    "date": "2020-03-17T00:00:00.000Z",
                    "total": 1,
                    "totalConfirmed": 3
                }
            ]

}

## Get timeline for all states

### Request

`GET /api/timelines/states`

    curl -i -H 'Accept: application/json' https://covid19ngr.herokuapp.com/api/timelines/states/

### Response

    {
        "data":
            [
                {
                    "state": String,
                    "data": [
                        {
                            "date": Date,
                            "confirmed": Number,
                            "totalConfirmed": Number
                        }
                    ]
                }
                ...
                ...
            ]
    }

## Get timeline for a state

### Params

-   statename = `String`

### Request

`GET /api/timelines/states/:statename`

    curl -i -H 'Accept: application/json' https://covid19ngr.herokuapp.com/api/timelines/states/:statename

### Response

    {
        "data":
            [
                {
                    "state": String,
                    "data": [
                        {
                            "date": Date,
                            "confirmed": Number,
                            "totalConfirmed": Number
                        }
                    ]
                }
            ]
    }

## Get states with confirmed cases on a particular day

### Query

-   date = `Date` format: YYYY-MM-DD

### Request

`GET /api/timelines/states?date=2020-05-05`

    curl -i -H 'Accept: application/json' https://covid19ngr.herokuapp.com/api/timelines/states?date=2020-05-05

### Response

    {
        "data":
            [
                {
                    "state": "borno",
                    "data": [
                        {
                            "date": "2020-05-05T00:00:00.000Z",
                            "confirmed": 6,
                            "totalConfirmed": Number
                        }
                    ]
                },
                {
                    "state": "bauchi",
                    "confirmed": [
                        {
                            "date": "2020-05-05T00:00:00.000Z",
                            "confirmed": 3,
                            "totalConfirmed": Number
                        }
                    ]
                },
                {
                    "state": "sokoto",
                    "confirmed": [
                        {
                            "date": "2020-05-05T00:00:00.000Z",
                            "confirmed": 1,
                            "totalConfirmed": Number
                        }
                    ]
                },
                ...
                ...
        ]
    }

# Contribution

Wanna contribute? Amazing...

1. Give this project a star.

2. Fork the repo and Read this guide [The beginner's guide to contributing to a GitHub project](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/)

3. Install the app, write your feature and make your pull request.

This API uses

-   [Node.js](https://nodejs.org) - JavaScript Runtime.
-   [Express.Js](https://expressjs.com/) - Web application framework.
-   [CheerioJs](http://cheerio.js.org/) - Analyze web pages using a jQuery-like syntax.
-   You can view the package.json for more

# Issues

Create an issue [here](https://github.com/Ethical-Ralph/NGRCOVID19API/issues)

# Todo

-   Writing Tests
