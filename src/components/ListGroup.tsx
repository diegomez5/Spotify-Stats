import Button from "./Button";

interface ListGroupProps {
  items: DataItem[];
  updateItems: (items: DataItem[]) => void;
}

function isArtist(item: DataItem): item is Artist {
  return (item as Artist).images !== undefined;
}

function ListGroup({ items, updateItems }: ListGroupProps) {
  const listGroupStyle: React.CSSProperties = {
    width: '50%', // adjust this percentage as needed
    //marginLeft: '40%', // centers the list group
    //marginRight: '25%',
    marginTop: '0px', // adjust the margin as needed
  };

  return (
    <>
      {items.length === 0 && <p>Select an Artist or Song to reccomend from.</p>}
      <ul className="list-group" style={listGroupStyle}>
        {items.map((item, index) => (
          <li key={item.uri + index} className="list-group-item" style={listGroupStyle}>
            {isArtist(item) ? `Artist: ${item.name}` : `${item.artists[0].name}: ${item.name}`}
            <Button onClick={() => updateItems(items.filter(i => i.uri !== item.uri))} left={98} top={0}>
              x
            </Button>
          </li>
        ))}
      </ul>
    </>
  )
}
export default ListGroup;