import React from 'react'
import './style.css';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import BuyImage from '../Images/buy.jpg';
import SellImage from '../Images/sell.jpg'
import ForcastImage from '../Images/forcast.png'


function PredictionComponent(props) {
    return (
        <div className="prediction-container">
            <div className="row1">
                <div className="quote">
                    <h4>Quote</h4>
                    <h2>{props.data.quote}</h2>
                </div>
                <div className="quote" style={{backgroundColor:"#f0c808"}}>
                    <h4>Date</h4>
                    <h2>{new Date().toISOString().slice(0, 10)}</h2>      
                </div>

                <div className="quote" style={{backgroundColor:"#0ead69",color:"black"}}>
                    <h4>Todays Total Volume</h4>
                    <h2>{props.data.vol}</h2> 
                </div>
                
                <div className="quote" style={{backgroundColor:"#bb9457",color:"black"}}>
                    <h4>Todays Adj Close</h4>
                    <h2>{props.data.adj_close}</h2> 
                </div>

                <div className="quote" style={{backgroundColor:"#dd1c1a",color:"black"}}>
                    <h4>Todays Close</h4>
                    <h2>{props.data.close_s}</h2> 
                </div>

                <div className="quote" style={{backgroundColor:"#548c2f",color:"black"}}>
                    <h4>Todays High </h4>
                    <h2>{props.data.high_s}</h2> 
                </div>
                
                <div className="quote" style={{backgroundColor:"#006ba6",color:"black"}}>
                    <h4>Todays Low</h4>
                    <h2>{props.data.low_s}</h2> 
                </div>

                <div className="quote" style={{backgroundColor:"#9fffcb",color:"black"}}>
                    <h4>Todays Open</h4>
                    <h2>{props.data.open_s}</h2> 
                </div>

            </div>
 

        <div className="row2">

        <div className="prediction" style={{backgroundColor:"#196bde",color:"black"}}>
                    <h3 >LSTM Model Prediction</h3>
                    <h2><span style={{color:'white',fontSize:40}}>{props.data.lstm_pred}</span></h2> 
                    <img width="500" height="250" src={props.data.lstm_graph}/>
        </div>

        <div className="prediction" style={{backgroundColor:"#0a9396",color:"black"}}>
                    <h3 >Linear Regression Model Prediction</h3>
                    <h2><span style={{color:'white',fontSize:40}}>{props.data.lr_pred}</span></h2> 
                    <img width="500" height="250" src={props.data.lr_graph}/>
        </div>
        <div className="prediction" style={{backgroundColor:"#ffba08",color:"black"}}>
                    <h3 >Arima Model Prediction</h3>
                    <h2><span style={{color:'white',fontSize:40}}>{props.data.arima_pred}</span></h2>
                    <img width="500" height="250" src={props.data.arima_graph}/> 
        </div>

        {/* {
            props.data.decision=="BUY" ? 
            <div className="prediction" style={{backgroundColor:"#2dc653",color:"black"}}>
                    <h4 >Call Action</h4>
                    <h2>{props.data.decision}</h2> 
        </div>                
          :
          <div className="prediction" style={{backgroundColor:"#d00000",color:"black"}}>
                    <h4 >Call Action</h4>
                    <h2>{props.data.decision}</h2> 
        </div>
        } */}


 
        </div>

        <div className="row3">
        <div className="twitter" style={{backgroundColor:"#00a5cf",color:"black",width:700,height:"300px"}}>
                    <h3 >Latest Tweets</h3>
                    <Paper style={{maxHeight:300, overflow: 'auto',width:680}}>
                         {
                             props.data.tw_list.map((ele)=><><List style={{padding:10}}>{ele}</List><Divider/></>)

                         }
                    </Paper>
        </div>
        <div className="twitter" style={{backgroundColor:"#06d6a0",color:"black",height:"300px"}}>
                    <h3 >Twitter Tweets Sentimenal Analysis</h3>
                    <img width="500" height="240" src={props.data.twitter_graph}/>
        </div>
        <div className="twitter" style={{backgroundColor:"#9fffcb",color:"black",width:'250px',height:"300px"}}>
                    <h3 >Overall Tweets Poll</h3>
                    <h3><span style={{color:'black',fontSize:30}}>{props.data.tw_pol}</span></h3> 
                    
        </div>
        </div>

        <div className="row4">
        <div className="call_to_action" style={{backgroundColor:"#5e7ce2",color:"black",width:'50%'}}>
                    <h2 >Next 7 Days Forcast</h2>
                    <img width="600" height="200" src={ForcastImage}/> <br></br>
                    <Paper style={{maxHeight:300, overflow: 'auto',width:600}}>
                         {

                             props.data.forecast_set.map((ele)=><><List style={{padding:10}}>{ele[0]}</List><Divider/></>)
                           
                         }
                    </Paper>
        </div>
        <div className="call_to_action" style={{backgroundColor:"#ffc857",color:"black",width:'50%'}}>
                    <h2 >Action to Take</h2>
                    <Divider/>
                    <h2><span style={{color:'black',fontSize:40}}>{props.data.decision}</span></h2>                     
                    { 
                        props.data.decision==="BUY" ? <img width="500" height="250" src={BuyImage}/> 
                        : <img width="700" height="200" src={SellImage}/> 
                         
                    }
        </div>  
        </div>
        </div>
    )
}

export default PredictionComponent
