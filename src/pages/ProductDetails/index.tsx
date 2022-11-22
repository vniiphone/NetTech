import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Loading } from "../../components/Loding";
import { ProductDetailsActions } from "../../components/ProductDetailsActions";
import { useFetchProductDetails } from "../../hooks/useFetchProductDetails";
import { moneyFormatter } from "../../utils/moneyFormatter";
import { AddCommentModal } from '../../components/AddCommentModal';
import { FormButton } from '../../components/FormButton/index';
import { useFetchComments } from '../../hooks/useFetchComments';
import { CommentCard } from '../../components/CommentCard';
import { ToastContainer } from 'react-toastify';
import styles from "./style.module.css";


export const ProductDetails = () => {

  const { productId } = useParams();

  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);

  const { fetchProductDetails, productDetails, loading, error } = useFetchProductDetails();
  const { fetchComments, comments, commentLoading, commentError } = useFetchComments();

  useEffect(() => {

    fetchProductDetails(productId);
    fetchComments(productId);

  }, [productId]);


  return (
    <main className="container-padding">
      {loading ? (
        <Loading />
      ) : (
        <>
          {showCommentModal && <AddCommentModal showModalState={setShowCommentModal} productId={productId} />}
          <ToastContainer hideProgressBar={true} />
          <div className={`${styles.container} max-width`}>
            <ProductDetailsActions />
            <section className={styles.flexContainer}>
              <div className={styles.productDetailsContainer}>
                <h3>{productDetails?.data.productName}</h3>
                <p className={styles.price}>
                  {moneyFormatter(productDetails?.data.productPrice)}
                </p>
                <p>{productDetails?.data.productDescription}</p>
              </div>
              <div className={styles.productImageContainer}>
                <img src={productDetails?.data.productImageUrl} alt={productDetails?.data.productName} />
              </div>
            </section>
            <section className={styles.commentsSection}>
              <h2>Comentários</h2>
              <div className={styles.commentsContainer}>
                {comments?.data.length == 0 && (
                  <p className={styles.noReviewsMessage}>This product has no reviews, be the first one!</p>
                )}
                {comments?.data.map((comment, index) => (
                  <CommentCard key={index} title={comment.title} content={comment.content} />
                ))}
              </div>
              <FormButton onClick={() => setShowCommentModal(true)}>
                Add a comment
              </FormButton>
            </section>
          </div>
        </>
      )}
    </main>
  );
}