import { mockLuminaires } from "../mock-data/mockLuminaires";
import { DBLuminaireModel } from "../interfaces/Luminaire";

type LuminaireModel = (typeof mockLuminaires)[0];

const API_URL = "http://localhost:5100/api/v1";

async function login(email: string, password: string) {
    const response = await fetch(`${API_URL}/Auth/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
}

async function register(email: string, password: string) {
    const response = await fetch(`${API_URL}/Auth/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
}

async function forgotPassword(email: string) {
    const response = await fetch(`${API_URL}/Auth/forgot-password`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    return response.json();
}

async function resetPassword(token: string, newPassword: string) {
    const response = await fetch(`${API_URL}/Auth/reset-password`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
    });
    return response.json();
}

async function getLuminaires(): Promise<DBLuminaireModel[]> {
    const response = await fetch(`${API_URL}/Luminaire`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });
    return response.json();
}

async function getLuminaire(uid: number): Promise<DBLuminaireModel> {
    const response = await fetch(`${API_URL}/Luminaire/${uid}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });
    return response.json();
}

async function createLuminaire(LuminaireModel: LuminaireModel) {
    const response = await fetch(`${API_URL}/Luminaire`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(LuminaireModel),
    });
    return response.json();
}

async function deleteLuminaire(uid: number) {
    const response = await fetch(`${API_URL}/Luminaire/${uid}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
        },
    });
    return response.json();
}

export {
    login,
    register,
    forgotPassword,
    resetPassword,
    getLuminaires,
    getLuminaire,
    createLuminaire,
    deleteLuminaire,
    LuminaireModel,
};
