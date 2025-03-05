import React, { useEffect, useCallback } from 'react'
import { useGlobalContext } from '../_main/context'
import { useImmer } from 'use-immer'
import { fetchTodos, updateTodo, deleteTodo } from './action'
import { CustomTable } from '../components/atoms'
import './styles.css'

function DashBoard() {
  const { state, dispatch } = useGlobalContext()
  const todos = state?.todo?.list || []

  const [store, updateStore] = useImmer({
    editingId: null,
    editData: { title: '' }
  })

  useEffect(() => {
    fetchTodos(dispatch)
  }, [dispatch])

  const handleEdit = useCallback(
    (todo) => {
      updateStore({ editingId: todo.id, editData: { ...todo } })
    },
    [updateStore]
  )

  const handleSave = useCallback(
    (id) => {
      updateTodo(id, store.editData, dispatch)
      updateStore({ editingId: null, editData: {} })
    },
    [store.editData, dispatch, updateStore]
  )

  const handleDelete = useCallback(
    (id) => {
      deleteTodo(id, dispatch)
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
    <div id='dashboard-con'>
      <h2 className='title'>DashBoard</h2>
      <CustomTable
        data={todos}
        store={store}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleChange={handleChange}
      />
    </div>
  )
}

export default DashBoard
