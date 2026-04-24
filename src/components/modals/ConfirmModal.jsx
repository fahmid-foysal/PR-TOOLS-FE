const ConfirmModal = ({
  isOpen,
  onClose,
  title = 'Confirm Action',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  loading = false,
  type = 'danger', // danger, warning, info
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  const getButtonClasses = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500';
      case 'info':
        return 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500';
      default:
        return 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-8 pt-8 pb-6">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-red-100 sm:mx-0 sm:h-14 sm:w-14">
                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-6 sm:text-left">
                <h3 className="text-xl leading-8 font-bold text-gray-900">
                  {title}
                </h3>
                <div className="mt-3">
                  <p className="text-base text-gray-600">
                    {message}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-8 py-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              disabled={loading}
              onClick={handleConfirm}
              className={`w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-6 py-3 text-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-4 sm:w-auto transition-colors duration-200 ${getButtonClasses()}`}
            >
              {loading ? 'Processing...' : confirmLabel}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-6 py-3 bg-white text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto transition-colors duration-200"
            >
              {cancelLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;