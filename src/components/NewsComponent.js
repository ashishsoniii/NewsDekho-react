import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'


export class NewsComponent extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }

     Articles = [
        {
            "source": {
                "id": "al-jazeera-english",
                "name": "Al Jazeera English"
            },
            "author": "John Power",
            "title": "UN report on Xinjiang ups pressure on brands like Tesla, Airbnb",
            "description": "United Nations human rights office calls on businesses to 'take all possible measures' to respect human rights.",
            "url": "https://www.aljazeera.com/economy/2022/9/1/un-report-on-xinjiang-raises-pressure-on-firms-to-cut-ties",
            "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2022/09/2010-11-03T000000Z_1855381862_GM1E6B3194M01_RTRMADP_3_MARKETS-COTTON.jpg?resize=1920%2C1440",
            "publishedAt": "2022-09-01T06:51:16Z",
            "content": "Kuala Lumpur, Malaysia A United Nations assessment that Chinas treatment of Uighurs may amount to crimes against humanity is the latest damning report to raise pressure on multinationals like Nike an… [+6876 chars]"
        },
        {
            "source": {
                "id": "news24",
                "name": "News24"
            },
            "author": "Felix Njini and S'thembile Cele",
            "title": "News24.com | Renewables won’t save SA from power woes - Germany learnt that painfully, says Mantashe",
            "description": "South Africa’s energy minister dismissed the notion that renewable electricity can bring an end to years of load shedding, pointing to Europe’s pivot back to the use of fossil fuels as evidence of the constraints of using green energy.",
            "url": "https://www.news24.com/fin24/Economy/renewables-wont-save-sa-from-power-woes-germany-learnt-that-painfully-says-mantashe-20220901",
            "urlToImage": "https://cdn.24.co.za/files/Cms/General/d/3952/89456344a90b4687b230b5349c8d0514.jpg",
            "publishedAt": "2022-09-01T06:21:22Z",
            "content": "South Africa’s energy minister dismissed the notion that renewable electricity can bring an end to years of load shedding, pointing to Europe’s pivot back to the use of fossil fuels as evidence of th… [+2754 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Yahoo Entertainment"
            },
            "author": "Proven VCT Plc",
            "title": "ProVen VCT plc: Transaction in Own Shares",
            "description": "ProVen VCT plc Transaction in own shares1 September 2022 ProVen VCT plc announces that, on 31 August 2022, it purchased the following shares for cancellation...",
            "url": "https://finance.yahoo.com/news/proven-vct-plc-transaction-own-060000858.html",
            "urlToImage": "https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo-1200x1200.png",
            "publishedAt": "2022-09-01T06:00:00Z",
            "content": "With a total net worth of $137 billion, Indian-born Gautam Adanis extraordinary wealth gain in 2022 has far surpassed that of any other billionaire, many of whom have seen their fortunes drop this ye… [+507 chars]"
        },
        {
            "source": {
                "id": "the-times-of-india",
                "name": "The Times of India"
            },
            "author": "Reuters",
            "title": "New U.S. rules on EV subsidies slam Hyundai, Kia's dreams",
            "description": "The Inflation Reduction Act signed into law by U.S. President Joe Biden last month excludes Hyundai Motor Co and its affiliate Kia Corp from federal tax credits because they don't yet make EVs in North America, knocking their EV ambitions in the short term at…",
            "url": "https://economictimes.indiatimes.com/industry/renewables/new-u-s-rules-on-ev-subsidies-slam-hyundai-kias-dreams/articleshow/93920951.cms",
            "urlToImage": "https://img.etimg.com/thumb/msid-93920278,width-1070,height-580,imgsize-68974,overlay-ettech/photo.jpg",
            "publishedAt": "2022-09-01T05:52:46Z",
            "content": "After grabbing the No. 2 spot in the U.S. electric vehicle market with stylish, long-range models, Hyundai Motor and Kia are the automakers with the most to lose from new rules that halt subsidies fo… [+4163 chars]"
        },


    ]

    capatilizedFirstChr = (string)=>
    {
        return string.charAt(0).toUpperCase() + string.slice(1);

    }


    constructor(props) {

        super(props);
        console.log("I am news constructie form news components")
        this.state = {
            // sample outputjson
            Articles: this.Articles,
            loading: false,
            page: 1
        }
        document.title = `${this.capatilizedFirstChr(this.props.category)} - NewsDekho.com`;
    }
    // Order: constructor>>>render>>>componentdidmount

    async updateNews(){

        // this fuction runs after render
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3d59be3f84fa41fcaa8797a8b2c10e85&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
    
        let data = await fetch(url);
        // async will wait till data is promised execiuted;
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
            Articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        });

    }

    async componentDidMount() {
        this.updateNews();
        



    }


    // function of next prev page 

    handlePrevclick = async () => {
        this.setState({page:this.state.page-1});
        this.updateNews();
        
        
    }
    
    handleNextclick = async () => {
        
        this.setState({page:this.state.page+1});
        this.updateNews();



    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center">

                    NewsDekho - Top  {this.capatilizedFirstChr(this.props.category)} Headlines
                </h1>
                {this.state.loading && <Loading />}
 
                <div className="row">

                    {!this.state.loading && this.state.Articles.map((element) => {

                        return <div className="col-md-4 my-3" key={element.url}>

                            <NewsItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0.60) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://img.freepik.com/free-vector/breaking-news-concept_23-2148514216.jpg?w=2000"} newsUrl={element.url} author ={element.author} publishedAt={element.publishedAt} source = {element.source.name} />
                        </div>
                    })}
                </div>
                <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevclick}>&larr; previous</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick} >Next &rarr; </button>

                </div>
            </div>
        )
    }
}

export default NewsComponent
