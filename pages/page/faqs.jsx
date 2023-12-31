import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import FaqsContent from '~/components/partials/page/FaqsContent';
import ContainerPage from '~/components/layouts/ContainerPage';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from './../../utilities/constant-class';

const FaqsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Frequently Asked Questions',
        },
    ];

    return (
        <ContainerPage title="Faqs" boxed={true}>
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <FaqsContent />
                </div>
            </div>
        </ContainerPage>
    );
};

export default withAuth(FaqsPage, AccessLevel.ALWAYS_ACCESS_LEVEL);
