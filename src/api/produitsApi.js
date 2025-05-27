import { api } from './api';

// ✅ Compter les produits
export async function countProduit() {
  try {
    const response = await api.get("countProduit");
    return response.data;
  } catch (error) {
    console.error("Erreur dans countProduit :", error);
    throw error;
  }
}

// ✅ Voir produits avec filtres facultatifs
export async function voir_produit({ categorie, sort } = {}) {
  try {
    const params = {};
    if (categorie) params.categorie = categorie;
    if (sort) params.sort = sort;

    const response = await api.get("produit/", { params });
    return response.data;
  } catch (error) {
    console.error("Erreur dans voir_produict :", error);
    throw error;
  }
}

// ✅ Détail d’un produit
export async function Detail_produit(id) {
  try {
    const response = await api.get(`produit/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Erreur dans Detail_produit :", error);
    throw error;
  }
}

// ✅ Ajouter un produit
export async function Ajouter_produit(formData) {
  try {
    const response = await api.post("produit/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // très important pour les fichiers (ex. image)
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur dans Ajouter_produit :", error);
    throw error;
  }
}

// ✅ Modifier un produit
export async function modifier_produit({ formData, id }) {
  try {
    const response = await api.put(`produit/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur dans modifier_produit :", error);
    throw error;
  }
}

// ✅ Supprimer un produit
export async function supprimer_produit(id) {
  try {
    const response = await api.delete(`produit/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Erreur dans supprimer_produit :", error);
    throw error;
  }
}
