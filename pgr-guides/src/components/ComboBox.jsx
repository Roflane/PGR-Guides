const ComboBox = ({filterCb, mapCb, filterNum}) => {
    return (
        <select
        className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filterNum}
        onChange={(e) => filterCb(Number(e.target.value))}
        >
            {mapCb()}
        </select>
    );
}

export default ComboBox;