import React from "react";
import { useAuth } from "../../context/AuthProvider";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsSearch,
  BsHandThumbsUp,
  BsHandThumbsDown,
} from "react-icons/bs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Body({ predictedData }) {
  const { closePricesArray, datesArray, predictionScore, pros, cons } =
    predictedData;

  const { userData } = useAuth();

  // Check if there is data
  const hasData =
    datesArray &&
    datesArray.length > 0 &&
    closePricesArray &&
    closePricesArray.length > 0;

  const data = hasData
    ? datesArray.map((date, index) => ({
        date: date,
        price: closePricesArray[index],
      }))
    : [];

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Stock Data</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Predicion Score</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{predictionScore}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>Pros</h3>
            <BsHandThumbsUp className="card_icon" />
          </div>
          <h1>{pros}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>Cons</h3>
            <BsHandThumbsDown className="card_icon" />
          </div>
          <h1>{cons}</h1>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>Recent Searches</h3>
            <BsSearch className="card_icon" />
          </div>
          <div className="card-content">
            {userData &&
            userData.searchedStocks &&
            userData.searchedStocks.length > 0 ? (
              <ul>
                {[...userData.searchedStocks]
                  .slice(-4)
                  .reverse()
                  .map((stock, index) => (
                    <li key={index}>{stock}</li>
                  ))}
              </ul>
            ) : (
              <p>No recent searches</p>
            )}
          </div>
        </div>
      </div>

      <div className="charts">
        {hasData ? (
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              width={400}
              height={200}
              data={data}
              margin={{
                top: 5,
                right: 20,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="1 10" />
              <XAxis dataKey="date" />
              <YAxis tickCount={10} tickFormatter={(value) => `$ ${value}`} />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Line
                type="natural"
                dataKey="price"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available to display the chart.</p>
        )}
      </div>
    </main>
  );
}

export default Body;
