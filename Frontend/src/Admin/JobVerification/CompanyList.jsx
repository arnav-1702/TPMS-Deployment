// src/components/CompanyList.jsx
import CompanyCard from "./CompanyCard";

const CompanyList = ({ title, companies, onCardClick, emptyMessage, cardComponent: CardComponent = CompanyCard }) => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-black mb-8">{title}</h2>
      <div className="flex gap-6 flex-wrap">
        {companies.length > 0 ? (
          companies.map((item) => (
            <CardComponent
              key={item._id}
              company={item} // Note: 'company' prop name is reused for jobs
              onClick={() => onCardClick(item)}
            />
          ))
        ) : (
          <p className="text-gray-500">{emptyMessage}</p>
        )}
      </div>
    </section>
  );
};

export default CompanyList;