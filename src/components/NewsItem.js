import React, { Component } from 'react'

export class NewsItem extends Component {



    render() {
        let { title, description, imageUrl, newsUrl, publishedAt, author,source } = this.props;
        return (
            <div className='my-3' >
                <div className="card" >
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <span className="badge rounded-pill text-bg-info">{source}</span>

                        <p className="card-text">{description}....</p>
                        <p className="card-text"> <small className="text-muted">By {!author ? "Mahapurush!" : author} on {!publishedAt ? "The Following Day" : new Date(publishedAt).toGMTString()}</small> </p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More...</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
