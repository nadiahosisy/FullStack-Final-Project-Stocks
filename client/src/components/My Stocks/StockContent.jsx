// eslint-disable-next-line react/prop-types
const StockContent = ({ content }) => {
  if (!content) {
    return null;
  }

  return (
    <div>
      <h3>Stock Analysis</h3>
      <p>{content}</p>
    </div>
  );
};

export default StockContent;
