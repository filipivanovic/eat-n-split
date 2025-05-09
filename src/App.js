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
const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  )
}

const App = () => {
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null)

  const handleShowAddFriend = e => {
    e.preventDefault()
    setShowAddFriend(prev => !prev)
    setSelectedFriend(false)
  }

  const handleAddFriend = friend => {
    setFriends(friends => [...friends, friend])
    setShowAddFriend(false)
  }

  const handleSelectFriend = friend => {
    setSelectedFriend(selected => (selected?.id === friend?.id ? null : friend))
    setShowAddFriend(false)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          selectedFriend={selectedFriend}
          onSelectFriend={handleSelectFriend}
          friends={friends}
        />
        {showAddFriend && <AddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? 'Close' : 'Add Friend'}</Button>
      </div>
      {selectedFriend && <SplitBill selectedFriend={selectedFriend} />}
    </div>
  )
}

const FriendsList = ({ friends, selectedFriend, onSelectFriend }) => {
  return (
    <ul>
      {friends.map(friend => (
        <Friend
          friend={friend}
          selectedFriend={selectedFriend}
          onSelectFriend={onSelectFriend}
          key={friend.id}
        />
      ))}
    </ul>
  )
}

const Friend = ({ friend, onSelectFriend, selectedFriend }) => {
  const isSelected = selectedFriend?.id === friend?.id

  return (
    <li className={isSelected ? 'selected' : ''}>
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

      <Button onClick={() => onSelectFriend(friend)}>{isSelected ? 'Close' : 'Select'}</Button>
    </li>
  )
}

const AddFriend = ({ onAddFriend }) => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('https://i.pravatar.cc/48?u=')

  const id = crypto.randomUUID()

  const newFriend = {
    id,
    name,
    image: `${image}${id}`,
    balance: 0
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!name || !image) return
    setName('')
    setImage('')
    onAddFriend(newFriend)
  }

  return (
    <form onSubmit={handleSubmit} className="form-add-friend">
      <label>🧑‍🤝‍🧑Friend name</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <label>🧙‍♂️Image URL</label>
      <input type="text" value={image} onChange={e => setImage(e.target.value)} />
      <Button>Add</Button>
    </form>
  )
}

const SplitBill = ({ selectedFriend }) => {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰Bill Value</label>
      <input type="text" />

      <label>👨‍🦱Your Expense</label>
      <input type="number" />

      <label>🧑‍🤝‍🧑{selectedFriend.name} Expense</label>
      <input type="number" disabled />

      <label>💸Who is paying the bill?</label>
      <select>
        <option>You</option>
        <option>{selectedFriend.name}</option>
      </select>

      <Button>Split</Button>
    </form>
  )
}

export default App