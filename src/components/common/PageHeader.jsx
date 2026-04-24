const PageHeader = ({
  title,
  subtitle,
  actions,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-2 text-lg text-gray-600">{subtitle}</p>}
        </div>
        {actions && (
          <div className="flex space-x-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;