import ItemTable from "../components/AllItem/ItemTable"


function AllItems() {
  return (
    <div className="all_item_page">
      <div className="common_page_head">
        <h1>All Items</h1>
      </div>
      <ItemTable />
    </div>
  )
}

export default AllItems