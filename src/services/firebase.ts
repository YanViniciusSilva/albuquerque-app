import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase.config";

export interface Budget {
  id: string;
  name: string;
  phone: string;
  dateCreated: string | Date;
  status: "pending" | "answered" | "expired";
  optionsSelected: Options[];
}

interface Options {
  id: number;
  questionId: number;
  description: string;
}

export interface FirebaseQuestionsModel {
  id: string;
  questionId: number;
  questionName: string;
  options: Array<OptionsModel>;
}

interface OptionsModel {
  optionId: number;
  value: string;
}

class FirebaseStorageService {
  async getBudgets(): Promise<Budget[]> {
    try {
      const querySnapshot = await getDocs(collection(db, "budgets"));
      return querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Budget)
      );
    } catch (error) {
      console.error(error);
      return [] as Budget[];
    }
  }

  async getBudgetById(id: string): Promise<Budget> {
    try {
      const querySnapshot = await getDoc(doc(db, "budgets", id));
      return querySnapshot.exists()
        ? ({ id: querySnapshot.id, ...querySnapshot.data() } as Budget)
        : ({} as Budget);
    } catch (error) {
      console.error(error);
      return {} as Budget;
    }
  }

  async getQuestions(): Promise<FirebaseQuestionsModel[]> {
    try {
      const querySnapshot = await getDocs(collection(db, "questions"));
      return querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as FirebaseQuestionsModel)
      );
    } catch (error) {
      console.error(error);
      return [] as FirebaseQuestionsModel[];
    }
  }

  async changeBudgetStatusById(
    id: string,
    status: "pending" | "answered" | "expired"
  ): Promise<void> {
    try {
      if (!id) {
        console.error("Erro: ID do documento está indefinido.");
        return;
      }

      const docRef = doc(db, "budgets", id);

      if (docRef) {
        await updateDoc(docRef, { status });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default new FirebaseStorageService();
