import { Menubar } from "primereact/menubar";

export default function AdminMenu() {
    let items = [
        { label: 'Dashboard', icon: 'pi pi-chart-bar', url:'/admin/dashboard' },
        { label: 'Cartes', icon: 'pi pi-image', url:'/admin/cartes'  },
        { label: 'Suggestions', icon: 'pi pi-search', url:'/admin/feedback'},
        { label: 'Règles du jeu', icon: 'pi pi-book', url: '/admin/rules' }
    ];

    return(
        <div>
            <div>
                <Menubar model={items} />
            </div>
        </div>
         

            
    )
}