import React, { useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
  


const News = (props) => {

      const [articles,setArticles] = useState([]);
      const [page,setPage] = useState(1);
      const [loading,setLoading] = useState(true);
      const [totalResults,setTotalResults] = useState(0);
      
    

       const firstCharCapital=(str)=>{ 
         return str.charAt(0).toUpperCase() + str.slice(1)
      }


    const update= async()=>{
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data =  await fetch(url);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
        setLoading(false);
    }

    useEffect(()=>{
      update();
      document.title = `NewsHunt- ${firstCharCapital(props.category)}`
      // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1); 
        setLoading(true);
        let data =  await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setLoading(false);
    };


  
    return (
      <>
        <h1 className="text-center" style={{margin:'35px', marginTop:'90px'}}>NewsHunt - Top {firstCharCapital(props.category)} Headlines </h1>
        {/* {loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length <= totalResults}
          loader={loading && <Spinner/>}
        >
          <div className="container">
            <div className="row">
            {articles.map((element,index)=>{
               return <div className="col-md-4" key={index}>
                <NewsItem title ={element.title} description= {element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                </div>
            })}
        </div>   
        </div>
        
        </InfiniteScroll>    
      </>
    )
  

}

News.defaultProps = {
  country: 'us',
  pageSize: 6,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
