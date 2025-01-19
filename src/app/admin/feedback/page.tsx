'use client';
import { useContext, useEffect, useState } from 'react';
import { useUser } from '@/app/provider/user.provider';
import { ToastContext } from '@/app/provider/toast.provider';
import { UserDto } from '@/app/interfaces/user.dto';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { deleteFetch, getFetch, patchFetch } from '@/app/service/fetch-api';
import { FeedBackDto } from '@/app/interfaces/feed-back.dto';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FeedbackEnum } from '@/app/enum/feedback.enum';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { StatusFeedbackEnum, traductionStatus } from '@/app/enum/status-feedback.enum';
import { Dialog } from 'primereact/dialog';
import DOMPurify from 'dompurify';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';


export default function Suggestion() {
  const router: AppRouterInstance = useRouter();
  const { user, setConnectedUser, isConnected } = useUser();
  const [feedbacks, setFeedbacks] = useState<FeedBackDto[]>([]);
  const [baseUrl, setBaseUrl] = useState<string>('');
  const [tokenUser, setTokenUser] = useState<string | undefined>(undefined);
  const [visible, setVisible] = useState<boolean>(false);
  const [activeMessage, setActiveMessage] = useState<FeedBackDto | null>(null);
  const [formattedDate, setFormattedDate] = useState('')
  const [safeHtml, setSafeHtml] = useState('')
  const [messageStatus, setMessageStatus] = useState('')
  const { show } = useContext(ToastContext);

  useEffect(() => {
    setBaseUrl(window.location.origin);

    const token: string | null = localStorage.getItem('ico');
    if (!token) {
      show('Erreur', `Vous n'êtes pas connecté`, 'error');
      router.push('/login');
    } else {
      setTokenUser(token);
      if (!user || !isConnected) {
        getUser(token);
      } else {
        getFeedBack(token);
      }
    }
  }, []);

  const status = [
    { name: 'Non traité', code: StatusFeedbackEnum.UNTREATED },
    { name: 'En cours', code: StatusFeedbackEnum.IN_PROGRESS },
    { name: 'Traité', code: StatusFeedbackEnum.TREATED },
  ];

  const getUser = async (token: string): Promise<void> => {
    const response: Response = await getFetch(`${baseUrl}/api/user`, token);
    const data: null | UserDto = await response.json();
    setConnectedUser(data);
    if (!data) {
      router.push('/login');
    }
    await getFeedBack(token);
  };

  const getFeedBack = async (token: string) => {
    const response: Response = await getFetch(`${baseUrl}/api/feedback`, token);
    const data: null | FeedBackDto[] = await response.json();
    if (data) {
      setFeedbacks(data);
    }
  };

  const typeTemplate = (feedback: FeedBackDto) => {
    return <div>
      <Tag value={feedback.type} className={feedback.type === FeedbackEnum.BUG ? `bg-redColor` : `bg-secondaryActionColor`}></Tag>
    </div>;
  };

  const dateTemplateDate = (feedback: FeedBackDto) => {
    const date = new Date(feedback.created_at);
    const formattedDate: string = date.toLocaleDateString('fr-FR');
    return <div>
      <p>{formattedDate}</p>
    </div>;
  };

  const openPopup = (feedback: FeedBackDto) => {
    setVisible(true);
    setActiveMessage(feedback);

  };

  const actionsTemplateDate = (feedback: FeedBackDto) => {
    if (activeMessage) {
      setMessageStatus(traductionStatus(activeMessage.status))
      const date = new Date(activeMessage.created_at);
      setFormattedDate(date.toLocaleDateString('fr-FR'))
      setSafeHtml(DOMPurify.sanitize(activeMessage.message))
    }
    return <div>
      <Button icon="pi pi-eye" onClick={() => openPopup(feedback)}></Button>
      <Button icon="pi pi-times hover:text-redColor" onClick={() => deleteFeedBack(feedback)}></Button>
    </div>;
  };

  const deleteFeedBack = async (feedback: FeedBackDto): Promise<void> => {
    if (tokenUser) {
      await deleteFetch(`${baseUrl}/api/feedback`, tokenUser, feedback)
        .then((): void => {
          show('Suppression de message', 'Le message a bien été supprimé', 'success');
        })
        .catch(() => show('Erreur suppression de message', 'Une erreur est survenue lors de la suppression', 'success'));
      console.log(feedback.id);
      setFeedbacks((prev) => prev.filter((element) => element.id !== feedback.id));

    }
  };

  const handleChangeStatus = async (e: DropdownChangeEvent, actualFeedBack: FeedBackDto): Promise<void> => {
    console.log(e)
    const body = {id:actualFeedBack.id, status: e.value.code }
    if (tokenUser) {
      await patchFetch(`${baseUrl}/api/feedback/status`, tokenUser, body).then(() => show('Mise à jour', `Statut du feedBack à bien été mit à jour `, 'success'))
      setFeedbacks((prev) => {
        return prev.map((feedback) => {
          if (feedback.id === actualFeedBack.id) {
            return { ...feedback, status: e.value.code  };
          }
          return feedback;
        });
      });
    }
  };

  const statusTemplateDate = (feedback: FeedBackDto) => {
    const selectFeedBack = status.find((element)=>element.code === feedback.status)
    return <div>
      <Dropdown
        value={selectFeedBack} // Valeur actuelle du feedback
        onChange={(event)=>handleChangeStatus(event, feedback)}
        options={status}
        optionLabel="name"
        placeholder="Sélectionner un statut"
        className="w-full md:w-14rem"
      />
    </div>;
  };


  return (
    <div className="w-[85%] m-auto">
      <h1 className="text-2xl text-blueColor mb-5">Suggestion</h1>

      {feedbacks && feedbacks.length > 0 ? (
        <div>
          <DataTable value={feedbacks} tableStyle={{ minWidth: '50rem' }}>
            <Column header="Type" body={typeTemplate}></Column>
            <Column header="date" body={dateTemplateDate}></Column>
            <Column field="email" header="Email"></Column>
            <Column field="subject" header="Sujet"></Column>
            <Column header="status" body={statusTemplateDate}></Column>
            <Column header="Actions" body={actionsTemplateDate}></Column>
          </DataTable>
        </div>


      ) : ('')
      }

      <Dialog header='Message' visible={visible} onHide={() => {
        if (!visible) return;
        setVisible(false);
        setActiveMessage(null);
      }}>
        {activeMessage ? (
          <div>
            <div className="flex justify-between">
              <div className="mb-2">
                <Tag value={activeMessage.type} className={`${activeMessage.type === FeedbackEnum.BUG ? 'bg-redColor' : 'bg-secondaryActionColor'} mr-1`}></Tag>
                <Tag value={messageStatus} className=""></Tag>
              </div>
              <p>{formattedDate}</p>
            </div>

            <p>Expéditeur : {activeMessage.email}</p>
            <div className="flex">
              <p className="bold mr-2">Message:</p>
              <p dangerouslySetInnerHTML={{ __html: safeHtml }} className="font-normal"></p>
            </div>

          </div>
        ) : ('')}

      </Dialog>
    </div>
  );
}