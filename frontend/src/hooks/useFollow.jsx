import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast'

const useFollow = () => {
    const queryClient = useQueryClient();
    const {mutate:follow, isPending} = useMutation({
        mutationFn: async (userId) => {
            try{
                const res = await fetch(`/api/users/follow/${userId}`, {
                    method: 'Post',
                })
                const data = await res.json();
                if(!res.ok){
                    throw new Error(data.error || "Something went wrong");
                }
                return 
            }
            catch(err){
                throw new Error(err);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['suggesstedUsers']})
            queryClient.invalidateQueries({queryKey: ['authUser']})
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return { follow, isPending };
    
}

export default useFollow;