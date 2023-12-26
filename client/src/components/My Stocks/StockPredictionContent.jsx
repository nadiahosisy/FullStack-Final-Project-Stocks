// eslint-disable-next-line react/prop-types
const StockPredictionContent = ({ content }) => {
  if (!content) {
    return null;
  }

  return (
    <div>
      <h3>Stock Prediction</h3>
      <p>{content}</p>
    </div>
  );
};

export default StockPredictionContent;
