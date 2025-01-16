import { Menubar } from "primereact/menubar";

export default function AdminMenu() {
    let items = [
        { label: 'Dashboard', icon: 'pi pi-plus', url:'/admin/dashboard' },
        { label: 'Cartes', icon: 'pi pi-search', url:'/admin/cartes'  },
        { label: 'Contacts', icon: 'pi pi-search' },
        { label: 'Règles du jeu', icon: 'pi pi-search' }
    ];

    return(
        <div>
            <div>
                <Menubar model={items} />
            </div>
        </div>
         

            
    )
}