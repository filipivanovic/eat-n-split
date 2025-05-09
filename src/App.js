import { useState } from 'react'

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0
  }
]

const App = () => {
  // const [friends, setFriends] = useState(initialFriends)
  const [showAddFriend, setShowAddFriend] = useState(false)

  const handleToggleAddFriend = e => {
    e.preventDefault()
    setShowAddFriend(prev => !prev)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {showAddFriend ? (
          <AddFriend />
        ) : (
          <Button onToggleAddFriend={handleToggleAddFriend}>Add Friend</Button>
        )}
      </div>
      <SplitBill />
    </div>
  )
}

const FriendsList = () => {
  const friends = initialFriends
  return (
    <ul>
      {friends.map(friend => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  )
}

const Friend = ({ friend }) => {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}{' '}
        </p>
      )}
      {friend.balance > 0 && (
        <p className={`green`}>
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>Select</Button>
    </li>
  )
}

const AddFriend = () => {
  return (
    <form className="form-add-friend">
      <label>Friend name</label>
      <input type="text" />
      <label>Image URL</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  )
}

const SplitBill = () => {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with XXXXXX</h2>

      <label>Bill Value</label>
      <input type="text" />

      <label>Your Expense</label>
      <input type="number" />

      <label>XXXXX Expense</label>
      <input type="number" />

      <label>Who is paying the bill?</label>
      <select>
        <option>You</option>
        <option>XXXXXX</option>
      </select>

      <Button>Split</Button>
    </form>
  )
}

const Button = ({ children, onToggleAddFriend }) => {
  return (
    <button onClick={onToggleAddFriend} className="button">
      {children}
    </button>
  )
}

export default App