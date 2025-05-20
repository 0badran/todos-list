export interface Todo {
   id: string,
   title: string,
   type: 'upcoming' | 'completed' | 'deleted',
   uuid: string,
   createdAt: string,
   updatedAt: string
};