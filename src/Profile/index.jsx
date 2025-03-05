import React, { useCallback } from 'react'
import { useGlobalContext } from '../_main/context'
import { updateUser, deleteUser } from '../Register/action'
import { useImmer } from 'use-immer'
import { CustomTable } from '../components/atoms'
import './styles.css'

function Profile() {
  const { state, dispatch } = useGlobalContext()
  const users = state.register.users
  const [store, updateStore] = useImmer({
    editingId: null,
    editData: { name: '', mobile: '', address: '', password: '' }
  })

  const handleEdit = useCallback(
    (user) => {
      updateStore({ editingId: user.id, editData: { ...user } })
    },
    [updateStore]
  )

  const handleSave = useCallback(
    (id) => {
      updateUser(id, store.editData, dispatch)
      updateStore({ editingId: null, editData: {} })
    },
    [store.editData, dispatch, updateStore]
  )

  const handleDelete = useCallback(
    (id) => {
      deleteUser(id, dispatch)
    },
    [dispatch]
  )

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target
      updateStore((draft) => {
        draft.editData[name] = value
      })
    },
    [updateStore]
  )

  return (
    <div id='profile-con'>
      <h2 className='title'>Profile</h2>
      <CustomTable
        data={users}
        store={store}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleChange={handleChange}
      />
    </div>
  )
}

export default Profile
