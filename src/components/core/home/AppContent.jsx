import React from 'react'

function AppContent() {
  return (
    <div className='flex border flex-col w-[100%] lg:w-[45%] rounded-lg border-gray-800 px-5 py-5 p-2 gap-4'>
        <h2 className='heading'>How to Use the To-Do App:</h2>
        <ul className='list'>
            <li>Enter a task in the input box and press "Add" to include it in your list.</li>
            <li>Click on a task to mark it as completed.</li>
            <li>Use the "Delete" button next to a task to remove it from your list.</li>
            <li>Your tasks are saved automatically in your browser.</li>
            <li>Refresh the page to see your saved tasks.</li>
        </ul>

        <h3 className='heading'>Task Management Tips:</h3>
        <ul className='list'>
            <li>Use short, clear task names to stay organized.</li>
            <li>Break down larger tasks into smaller subtasks for easier tracking.</li>
            <li>Prioritize important tasks by adding tags or emojis (e.g., ⭐ Urgent).</li>
        </ul>

        <h3 className='heading'>Advanced Features (if available):</h3>
        <ul className='list'>
            <li>Drag and drop tasks to reorder them by priority.</li>
            <li>Set due dates or reminders for upcoming tasks.</li>
            <li>Filter tasks by status: All, Active, or Completed.</li>
        </ul>

    </div>
  )
}

export default AppContent