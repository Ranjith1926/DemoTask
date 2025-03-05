// import React from 'react'
// import './styles.css'

// export const CustomTable = ({
//   TableData,
//   store,
//   updateStore,
//   handleEdit,
//   handleSave,
//   handleDelete
// }) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Title</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {TableData.map((todo) => (
//           <tr key={todo.id}>
//             <td>{todo.id}</td>
//             <td>
//               {store.editingId === todo.id ? (
//                 <input
//                   type='text'
//                   value={store.editData.title}
//                   onChange={(e) =>
//                     updateStore((draft) => {
//                       draft.editData.title = e.target.value
//                     })
//                   }
//                 />
//               ) : (
//                 todo.title
//               )}
//             </td>
//             <td>
//               <button
//                 onClick={() =>
//                   store.editingId === todo.id
//                     ? handleSave(todo.id)
//                     : handleEdit(todo)
//                 }
//               >
//                 {store.editingId === todo.id ? 'Save' : 'Edit'}
//               </button>
//               <button onClick={() => handleDelete(todo.id)}>Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   )
// }

import React from 'react'

export const CustomTable = ({
  data,
  store,
  handleEdit,
  handleSave,
  handleDelete,
  handleChange
}) => {
  if (!data || data.length === 0) return <p>No data available.</p>

  // Extract headers dynamically (excluding 'id')
  const headers = Object.keys(data[0]).filter((key) => key !== 'id')

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          {headers.map((header) => (
            <th key={header}>
              {header.charAt(0).toUpperCase() + header.slice(1)}
            </th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          const isEditing = store.editingId === item.id

          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              {headers.map((field) => (
                <td key={field}>
                  {isEditing ? (
                    <input
                      type='text'
                      name={field}
                      value={store.editData[field] || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    item[field]
                  )}
                </td>
              ))}
              <td>
                {isEditing ? (
                  <button onClick={() => handleSave(item.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(item)}>Edit</button>
                )}
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}