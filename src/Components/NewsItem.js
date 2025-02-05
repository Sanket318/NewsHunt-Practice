import React from 'react'

const NewsItem = (props)=> {  
    let {title, description, imgUrl, newsUrl, author, date} = props;

    return (
       <div className='my-3'>
        <div className="card">
           <img src={imgUrl?imgUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa4jIU6YxKI0jV2Iz20caLkS4h0vvxpl80VQ&s"} className="card-img-top" alt="..."/>
           <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a  href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark" >Read More</a>
            <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
        </div>
        </div>
      </div>
    )
  
}

export default NewsItem
