const SectionList = ({
  sections,
}: {
  sections: {
    title: string;
    data: { title: string; scanningFunction: () => void }[];
  }[];
}) => (
  <div className="container">
    {sections.map((section, index) => (
      <div className="mt-5" key={index}>
        <h2 className="h4">{section.title}</h2>
        {section.data.map((item, itemIndex) => (
          <div key={itemIndex}>
            <h3 className="text-lg mt-2">
              <a href="#" onClick={item.scanningFunction}>
                {item.title}
              </a>
            </h3>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default SectionList;
