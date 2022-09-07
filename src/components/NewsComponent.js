import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
// import LoadingBar from 'react-top-loading-bar';


export class NewsComponent extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
        apikey: '6b78a6e95a964aa8b3aceea48a84d044'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apikey: PropTypes.string

    }

    Articles = [  //sample!
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


    ]

    capatilizedFirstChr = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);

    }


    constructor(props) {

        super(props);
        console.log("I am news constructie form news components")
        this.state = {
            // sample outputjson
            Articles: this.Articles,
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capatilizedFirstChr(this.props.category)} - NewsDekho.com`;

    }
    // Order: constructor>>>render>>>componentdidmount

    async updateNews() {
        this.props.setProgress(5);
        // this fuction runs after render
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });

        this.props.setProgress(15);
        let data = await fetch(url);
        this.props.setProgress(40);
        // async will wait till data is promised execiuted;
        let parseData = await data.json();
        this.props.setProgress(50);
        console.log(parseData);
        this.setState({
            Articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        });
        this.props.setProgress(100);

    }

    async componentDidMount() {
        this.updateNews();
    }


    // function of next prev page 

    handlePrevclick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();


    }

    handleNextclick = async () => {

        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true }); //bcz I don't want loading top bar when fetching more

        let data = await fetch(url);
        // async will wait till data is promised execiuted;
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
            Articles: this.state.Articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            loading: false
        });
    }

    render() {
        return (
            <>
                <h1 className="text-center my-4">

                    NewsDekho - Top  {this.capatilizedFirstChr(this.props.category)} Headlines
                </h1>
                {/* Spinner here! */}
                {this.state.loading && <Loading />}



                <InfiniteScroll
                    dataLength={this.state.Articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.Articles.length !== this.state.totalResults}
                    loader={<Loading />}
                    // height={400}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Explore More Topic from NavBar!</b>
                        </p>
                    }
                >

                    <div className="container">

                        <div className="row">
                            {this.state.Articles.map((element) => {

                                return <div className="col-md-4 my-3" key={element.url}>

                                    <NewsItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0.60) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://img.freepik.com/free-vector/breaking-news-concept_23-2148514216.jpg?w=2000"} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>


                </InfiniteScroll>


                {/* <div className="d-flex justify-content-between"> */}
                {/* Previous and Next Button  */}
                {/* <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevclick}>&larr; previous</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick} >Next &rarr; </button> */}

                {/* </div> */}

            </>
        )
    }
}

export default NewsComponent
