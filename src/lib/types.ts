export interface Todo {
   id: string,
   title: string,
   type: 'upcoming' | 'completed' | 'deleted',
   createdAt: string,
   updatedAt: string
};

export interface User {
   id: number,
   firstName: string,
   lastName: string,
   email: string,
   hash: string,
   createdAt: string,
   updatedAt: string
}