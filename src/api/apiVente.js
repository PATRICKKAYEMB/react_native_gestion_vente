import { api } from "./api";




export async function voir_vente ({ categorie,date_debut,date_fin,sort}={}){
        try {
            const params = {}
            if (categorie) params.categorie=categorie
            if (date_debut && date_fin){
                params.date_debut= date_debut
                params.date_fin = date_fin
            }
            if(sort) params.sort = sort

            const response = await api.get("historiqueVente/",{params})
            return response.data
            
        }catch (error) {
            console.error("Erreur lors de la récupération des ventes :", error);
            throw error;
          }
            
}

export async function vendre_produit({ data, id }) {
    try {
      const response = await api.post(`venteProduit/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la vente :", error);
      throw error;
    }
  }

  export async function countVente(){
    const response = await api.get("countVente/")
    return response.data
      
    
  }
  




