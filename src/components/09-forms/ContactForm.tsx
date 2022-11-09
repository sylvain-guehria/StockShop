const ContactForm = () => {
  return (
    <form
      action="#"
      method="POST"
      className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
    >
      <div>
        <label
          htmlFor="first-name"
          className="block text-sm font-medium text-gray-700"
        >
          First name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="first-name"
            id="first-name"
            autoComplete="given-name"
            className="  block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="last-name"
          className="block text-sm font-medium text-gray-700"
        >
          Last name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="last-name"
            id="last-name"
            autoComplete="family-name"
            className="  block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="  block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          Company
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="company"
            id="company"
            autoComplete="organization"
            className="  block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <div className="flex justify-between">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <span id="phone-description" className="text-sm text-gray-500">
            Optional
          </span>
        </div>
        <div className="mt-1">
          <input
            type="text"
            name="phone"
            id="phone"
            autoComplete="tel"
            aria-describedby="phone-description"
            className="  block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <div className="flex justify-between">
          <label
            htmlFor="how-can-we-help"
            className="block text-sm font-medium text-gray-700"
          >
            How can we help you?
          </label>
          <span
            id="how-can-we-help-description"
            className="text-sm text-gray-500"
          >
            Max. 500 characters
          </span>
        </div>
        <div className="mt-1">
          <textarea
            id="how-can-we-help"
            name="how-can-we-help"
            aria-describedby="how-can-we-help-description"
            rows={4}
            className="  block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            defaultValue={''}
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="how-did-you-hear-about-us"
          className="block text-sm font-medium text-gray-700"
        >
          How did you hear about us?
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="how-did-you-hear-about-us"
            id="how-did-you-hear-about-us"
            className="  block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
      </div>
      <div className="text-right sm:col-span-2">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-primary-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
export default ContactForm;
