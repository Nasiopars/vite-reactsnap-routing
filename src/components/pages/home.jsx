import React,{useState,useEffect,} from 'react';
import reactLogo from '../../assets/react.svg'
import { Link } from "react-router-dom";
import axios from '../api/axios';
import LoadingSpinner from '../loadingSpinner';
import { Helmet } from 'react-helmet';


const dbUrl = "https://my-json-server.typicode.com/Nasiopars/test-vite-preload/db";

const Home = () => {
    const [count, setCount] = useState(0)
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    useEffect(()=>{
      const getLinks = async ()=>{
          try{
            setIsLoading(true);
            const response = await axios.get(dbUrl);
            const datas = response.data.links;
            setLinks(datas);
          }catch(error){
            if (!error?.response){
                setErrMsg('پاسخی از سمت سرور دریافتا نشد');
            }
            console.log(error);
          }
      }
      setTimeout(getLinks, 500);
      setIsLoading(false);
  },[]);

    const renderLinks = (linksState)=>{
      const result = linksState.map(link=>{
        return <li className="text-right" key={link.id}>
                <Link to={`/links/${link.id}`}>{link.title}</Link>
               </li>
      })
      return result;
    }

    const handleIncrement = () =>{
      let sum  = count + 1 ; 
     setCount(sum);
    }

    return (
        <>
          {/* <div className="App"> */}

            <Helmet>
              <meta charSet="utf-8" />
              <meta name="author" content="kabir" />
              <meta name="description" content="an app for match test vite + preloder system" />
              <meta name="keywords" content="HTML, CSS, JavaScript" />
              {/* <meta name="robots" content="noindex/nofollow" /> */}
              {/* <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large" /> */}
              <title>vite-reactsnap-route</title>
              <link rel="icon" type="image/x-icon" href="/favicon.ico" />
              {/* <link rel="canonical" href="" /> */}
            </Helmet>


            <div>
              <a href="https://vitejs.dev" target="_blank">
                <img src="/vite.svg" className="logo" alt="Vite logo" />
              </a>
              <a href="https://reactjs.org" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
          </div>
          <span className="inline-flex"> with routing <h1>Vite + React snap library </h1></span>
          
          
          <div className="card">
            <button onClick={handleIncrement}>
              count is {count}
            </button>
            <button 
            // onClick={handleGetData}
            >
              بروزرسانی لینک ها
            </button>
            <h2 className='text-right'>
               لینک های دسترسی
            </h2>
            <ul className="listStyle">
                {(!isLoading)?
                  <LoadingSpinner/>
                :
                  links.length>0 && renderLinks(links)
                }
            </ul>
            {/* {console.log(links.match.id)} */}
          </div>
          <h2>
            تیتر اول
          </h2>
          <p className="justify">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
          </p>
        {/* </div> */}

        </>
        
    )
}

export default Home;