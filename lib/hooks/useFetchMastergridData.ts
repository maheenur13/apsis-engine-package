/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import type { IGridDataPayload, IGridResponse, IGridTitlePayload, IGridTitleResponse } from '../interfaces';



export const useFetchMasterGridData = (gridSlug:string) => {
  
  const [masterGridData, setMasterGridData] = useState<IGridResponse>();
  const [titleData, setTitleData] = useState<IGridTitleResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
//   const [token ,setToken] = useState(null);

  const userData = JSON.parse(localStorage.getItem('user')!);

    const fetchGridData = async (payload:IGridDataPayload) => {
      console.log('yessss');
      
      try {
        // Fetch data from the first API based on slug
        const response1 = await fetch(`${'https://ificapi.apsissolutions.com/api/v1'}/master-grid/grid-data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.access_token}`
          },
          body: JSON.stringify({...payload,slug:gridSlug}),
        });

        
        if (!response1.ok) {
          throw new Error('Failed to fetch master grid data!');
        }
        const data1 = await response1.json();
        setMasterGridData(data1.data);

        setIsLoading(false);
      } catch (error:any) {
        setError(error?.message);
        setIsLoading(false);
      }
    };
    const fetchTitleData = async (payload:IGridTitlePayload) => {
      try {
        // Fetch data from the first API based on slug
        const response1 = await fetch(`${'https://ificapi.apsissolutions.com/api/v1'}/master-grid/grid-title`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.access_token}`
          },
          body: JSON.stringify({...payload,slug:gridSlug}),
        });
        if (!response1.ok) {
          throw new Error('Failed to fetch grid title data!');
        }
        const data1 = await response1.json();
        setTitleData(data1.data);

        setIsLoading(false);
      } catch (error:any) {
        setError(error?.message);
        setIsLoading(false);
      }
    };

    


  return { masterGridData, titleData, isLoading, error,fetchGridData,fetchTitleData };
};

