const BookDetailsPageInfoTable = ({book}) => {
    const {language, numberOfPages, isbn, edition, yearOfPublication } = book;
    return (
        <div className="overflow-auto">
            <table className="min-w-full divide-y-2 divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                <tr className="*:text-gray-900 *:first:font-medium">
                    <td className="px-3 py-2 whitespace-nowrap">Year of publication</td>
                    <td className="px-3 py-2 whitespace-nowrap">{yearOfPublication}</td>
                </tr>

                <tr className="*:text-gray-900 *:first:font-medium">
                    <td className="px-3 py-2 whitespace-nowrap">Language</td>
                    <td className="px-3 py-2 whitespace-nowrap">{language}</td>
                </tr>
                <tr className="*:text-gray-900 *:first:font-medium">
                    <td className="px-3 py-2 whitespace-nowrap">Edition</td>
                    <td className="px-3 py-2 whitespace-nowrap">{edition}</td>
                </tr>
                <tr className="*:text-gray-900 *:first:font-medium">
                    <td className="px-3 py-2 whitespace-nowrap">Number of pages: </td>
                    <td className="px-3 py-2 whitespace-nowrap">{numberOfPages}</td>
                </tr>
                <tr className="*:text-gray-900 *:first:font-medium">
                    <td className="px-3 py-2 whitespace-nowrap">ISBN</td>
                    <td className="px-3 py-2 whitespace-nowrap">{isbn}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
export default BookDetailsPageInfoTable;