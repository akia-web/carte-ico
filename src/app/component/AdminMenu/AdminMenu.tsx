import { Menubar } from "primereact/menubar";

export default function AdminMenu() {
    let items = [
        { label: 'Dashboard', icon: 'pi pi-chart-bar', url:'/admin/dashboard' },
        { label: 'Cartes', icon: 'pi pi-search', url:'/admin/cartes'  },
        { label: 'Suggestions', icon: 'pi pi-search' },
        { label: 'Règles du jeu', icon: 'pi pi-book' }
    ];

    return(
        <div>
            <div>
                <Menubar model={items} />
            </div>
        </div>
         

            
    )
}