import React, {useEffect} from 'react';
import {useMutation} from '@apollo/client';

import NoteForm from '../components/NoteForm';
import { GET_NOTES, GET_NOTE} from '../gql/query';
import { NEW_NOTE } from '../gql/mutation';



const NewNote = props =>{
    useEffect(()=>{
        document.title = 'New Note - Notedly';
    });

    const [data, {loading, error}] = useMutation(NEW_NOTE, {

        refetchQueries: [{query: GET_NOTES}, {query:GET_NOTE}],
        onCompleted: data =>{
            // when complete, redirect user to the note page
            props.history.push(`note/${data.newNote.id}`);
        }
    });

    return (
        <React.Fragment>
            {loading && <p>Loading</p>}
            {error && <p>Error saving the note</p>}
            <NoteForm action={data}/>
        </React.Fragment>
    );
};
export default NewNote;